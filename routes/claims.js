const express = require("express");
const router = express.Router();
const Claim = require("../models/claimsModel");

// Handle GET request to view claims
router.get("/", async (req, res) => {
  try {
    const claims = await Claim.find();
    res.render("claims", { claims });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle POST request to submit a new claim
router.post("/submit", async (req, res) => {
  try {
    const newClaim = new Claim({
      title: req.body.title,
      description: req.body.description,
    });

    await newClaim.save();
    res.redirect("/claims");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle POST request to delete a claim
router.post("/delete/:claimId", async (req, res) => {
  try {
    await Claim.findByIdAndDelete(req.params.claimId);
    res.redirect("/claims");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle GET request to edit a claim
router.get("/edit/:claimId", async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId);
    res.render("edit-claim", { claim });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;


