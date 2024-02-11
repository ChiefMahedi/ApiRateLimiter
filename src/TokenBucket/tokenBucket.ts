export default class TokenBucket {
    private capacity: number;
    private fillRate: number;
    private tokens: number;
    private lastFilled: number;
    constructor(capacity: number, fillRate: number) {
        this.capacity = capacity;
        this.fillRate = fillRate;
        this.tokens = capacity;
        this.lastFilled = Date.now();
    }

    private fillBucket(): void {
        const now = Date.now();
        const elapsed = now - this.lastFilled;
        this.tokens += elapsed * (this.fillRate / 1000);
        this.tokens = Math.min(this.tokens, this.capacity);
        this.lastFilled = now;
    }

    public consumeToken(): boolean {
        this.fillBucket();
        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }
        return false;
    }
}

//Test
const bucket = new TokenBucket(5, 2);

console.log(bucket.consumeToken()); 
console.log(bucket.consumeToken()); 
console.log(bucket.consumeToken()); 
console.log(bucket.consumeToken()); 
console.log(bucket.consumeToken()); 
console.log(bucket.consumeToken()); 
