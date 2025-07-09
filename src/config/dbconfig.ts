import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";

// 환경변수 검증
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error(
    "MONGODB_URI 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.",
  );
}

// 최적화된 MongoDB 클라이언트 옵션
const client = new MongoClient(uri, {
  maxPoolSize: 10, // 200은 과도함, 10-20이 적절
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
  retryReads: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// 연결 상태 관리
let connectionPromise: Promise<MongoClient> | null = null;
let isConnecting = false;

/**
 * MongoDB 연결을 안전하게 관리하는 함수
 */
async function connectToDatabase(): Promise<MongoClient> {
  // 이미 연결 중이면 기존 Promise 반환
  if (connectionPromise) {
    return connectionPromise;
  }

  // 연결 시도 중이면 대기
  if (isConnecting) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return connectToDatabase();
  }

  isConnecting = true;

  try {
    connectionPromise = client.connect();
    const connectedClient = await connectionPromise;

    // 연결 성공 로그 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      console.log("✅ MongoDB 연결 성공");
    }

    // 연결 이벤트 리스너 등록
    client.on("close", () => {
      connectionPromise = null;
      if (process.env.NODE_ENV === "development") {
        console.log("🔌 MongoDB 연결 종료");
      }
    });

    client.on("error", (error) => {
      connectionPromise = null;
      console.error("❌ MongoDB 연결 오류:", error);
    });

    return connectedClient;
  } catch (error) {
    connectionPromise = null;
    console.error("❌ MongoDB 연결 실패:", error);
    throw error;
  } finally {
    isConnecting = false;
  }
}

/**
 * 컬렉션을 안전하게 가져오는 함수
 */
export async function getCollection(
  collectionName: string,
): Promise<Collection> {
  try {
    await connectToDatabase();
    const db: Db = client.db("worklogdb");
    return db.collection(collectionName);
  } catch (error) {
    console.error(`컬렉션 ${collectionName} 접근 실패:`, error);
    throw new Error(`데이터베이스 연결에 실패했습니다: ${error}`);
  }
}

/**
 * 데이터베이스 연결 상태 확인
 */
export function isConnected(): boolean {
  return connectionPromise !== null;
}

/**
 * 연결 종료 (테스트나 서버 종료 시 사용)
 */
export async function closeConnection(): Promise<void> {
  if (connectionPromise) {
    try {
      await client.close();
      connectionPromise = null;
      console.log("🔌 MongoDB 연결이 정상적으로 종료되었습니다.");
    } catch (error) {
      console.error("MongoDB 연결 종료 중 오류:", error);
    }
  }
}

// 프로세스 종료 시 연결 정리
process.on("SIGINT", closeConnection);
process.on("SIGTERM", closeConnection);
