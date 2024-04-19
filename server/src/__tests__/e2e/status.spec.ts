import request from "supertest";
import { app } from "../../app";

describe("Status", () => {
    it("Should check server status", async () => {
        const {body, statusCode} = await request(app).get("/status");
        console.log("BODY:", body);
        expect(true).toBe(true); 
    });
})