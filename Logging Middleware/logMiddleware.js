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
