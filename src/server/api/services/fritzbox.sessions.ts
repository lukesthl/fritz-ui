import { LRUCache } from "lru-cache";

declare global {
  // eslint-disable-next-line no-var
  var globalCache: LRUCache<string, object> | undefined;
}

class CacheService<T extends object> {
  private cache: LRUCache<string, T>;

  constructor(options?: { max?: number; ttl?: number }) {
    if (!global.globalCache) {
      global.globalCache = new LRUCache({
        max: options?.max ?? 100,
        ttl: options?.ttl ?? 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
      });
    }
    this.cache = global.globalCache as unknown as LRUCache<string, T>;
  }

  async store(key: string, value: T) {
    this.cache.set(key, value);
  }

  async get(key: string) {
    const result = this.cache.get(key) ?? null;
    return result;
  }

  async remove(key: string) {
    this.cache.delete(key);
  }
}

export const fritzBoxSessions = new CacheService<{
  username: string;
  password: string;
}>();
