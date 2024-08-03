const { StatusCodes } = require("http-status-codes"); // Corrected import

const { dbConnectionPool, dbConnectionPromise } = require("../db/dbConfig");

async function GetAnswersByQuestionId(req, res) {
	const questionId = req.params.questionId;
	try {
		const query =
			"SELECT q.*,u.username FROM answers q INNER JOIN users u ON q.userid=u.userid WHERE questionid = ?";
		const result = await dbConnectionPromise.query(query, [questionId]);
		if (result.length > 0) {
			return res.status(StatusCodes.OK).json(result[0]);
		} else {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "Question not found" });
		}
	} catch (error) {
		console.error("Error fetching question detail:", error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong" });
	}
}
module.exports = { GetAnswersByQuestionId };
