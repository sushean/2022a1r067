const axios = requirer('axios');

async function Log(stack, level, pkg, message) {
  const allowedStacks = ["backend", "frontend"];
  const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
  const allowedPackages = ["auth", "config", "middleware", "utils"];
}

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

try 
{
    const response = await axios.post("http://20.244.56.144/evaluation-service/logs", body);
    console.log("Log sent successfully:", response.status);
} 
catch (err) 
{
    console.error("Failed to send log:", err.message);
}
