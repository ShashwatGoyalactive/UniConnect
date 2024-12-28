const test = async (req, res) => {
    res.json({ echo: "Server is working" });
};

module.exports = { test };
