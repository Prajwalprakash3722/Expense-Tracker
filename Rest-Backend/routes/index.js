const express = require("express");

const router = express.Router();
router.use("/api", require("./ApiRoutes/api"));
//Some test endpoints

router.get("/test", (_req, res) => {
  res.json({
    ok: true,
  });
});

module.exports = router;
