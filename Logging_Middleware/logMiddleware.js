const axios = require('axios');

async function Log(stack, level, pkg, message) {
  const allowedStacks = ["backend", "frontend"];
  const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
  const allowedPackages = ["auth", "config", "middleware", "utils"];


  if (!allowedStacks.includes(stack)) 
    {
        throw new Error("Invalid stack");
    }
  if (!allowedLevels.includes(level))
    {
        throw new Error("Invalid level");
    } 
  if (!allowedPackages.includes(pkg)) 
    {
        throw new Error("Invalid package");
    }

    const body = {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message,
    };

    try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      body,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMDIyYTFyMDY3QG1pZXRqYW1tdS5pbiIsImV4cCI6MTc1MTg2OTA5NSwiaWF0IjoxNzUxODY4MTk1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjAxMGY3MDMtZDJjMy00ZTU1LTg1NzEtYmIwOGQwNGY2NzVkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic3VzaGVhbiIsInN1YiI6IjY4NTNmODRlLWQzOGMtNGE1OS1hZDY3LWFiZDIxODYwMjkzMyJ9LCJlbWFpbCI6IjIwMjJhMXIwNjdAbWlldGphbW11LmluIiwibmFtZSI6InN1c2hlYW4iLCJyb2xsTm8iOiIyMDIyYTFyMDY3IiwiYWNjZXNzQ29kZSI6IkZZalFIYyIsImNsaWVudElEIjoiNjg1M2Y4NGUtZDM4Yy00YTU5LWFkNjctYWJkMjE4NjAyOTMzIiwiY2xpZW50U2VjcmV0IjoiU0Rxdk5uTWFoTWZCU2ZhYSJ9.twLPza4uLJaR-dChnBH9DYfK7GNA2-8GWV5FsjrCZXI`
        }
      }
    );

    console.log("Log sent:", response.status);
  } 
    catch (err) 
    {
        console.error("Failed to send log:", err.message);
    }
}
module.exports = { Log };