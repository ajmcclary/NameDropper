const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, "dist/namedropper")));

// Serve index.html for any GET request that doesn't match a static file
// This ensures proper handling of Angular routes
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/namedropper/index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `Application should be accessible at https://namedropper.backend.app/`
  );
});
