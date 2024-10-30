const {
  PlayerModel,
  TeamModel,
  GameModel,
  Questions,
} = require('../Model/model');

class QuizController {
  static ShowPlayer = async (req, res) => {
    // const [id] = req.body;
    const data = await PlayerModel.find();
    console.log('result===========>', data);
    res.send(data);
  };

  static AddPlayer = async (req, res) => {
    const id = req.body.playerId;
    const data = PlayerModel({ playerId: id });
    const result = await data.save();
    console.log('result===========>', result);
    res.send(result);
  };

  static ChooseTeam = async (req, res) => {
    const id = req.body.player;
    const teamId = req.body.teamId;
    const data = TeamModel({ player: id, teamId: teamId });
    const result = await data.save();
    res.send(result);
  };

  static JoinTeam = async (req, res) => {
    // const questionsData = [
    //   {
    //     question: 'What is the capital of France?',
    //     answer: 'Paris',
    //     options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    //   },
    //   {
    //     question: 'What is 2 + 2?',
    //     answer: '4',
    //     options: ['3', '4', '5', '6'],
    //   },
    //   {
    //     question: "Who wrote 'To Kill a Mockingbird'?",
    //     answer: 'Harper Lee',
    //     options: [
    //       'Mark Twain',
    //       'Harper Lee',
    //       'F. Scott Fitzgerald',
    //       'Ernest Hemingway',
    //     ],
    //   },
    //   {
    //     question: 'What is the chemical symbol for water?',
    //     answer: 'H2O',
    //     options: ['CO2', 'H2O', 'O2', 'N2'],
    //   },
    //   {
    //     question: 'In what year did the Titanic sink?',
    //     answer: '1912',
    //     options: ['1912', '1905', '1920', '1898'],
    //   },
    //   {
    //     question: 'What is the largest planet in our solar system?',
    //     answer: 'Jupiter',
    //     options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    //   },
    //   {
    //     question: 'Who painted the Mona Lisa?',
    //     answer: 'Leonardo da Vinci',
    //     options: [
    //       'Pablo Picasso',
    //       'Vincent van Gogh',
    //       'Leonardo da Vinci',
    //       'Claude Monet',
    //     ],
    //   },
    //   {
    //     question: 'What is the square root of 16?',
    //     answer: '4',
    //     options: ['2', '4', '8', '16'],
    //   },
    //   {
    //     question: 'What is the currency of Japan?',
    //     answer: 'Yen',
    //     options: ['Yen', 'Won', 'Dollar', 'Peso'],
    //   },
    //   {
    //     question:
    //       'What is the boiling point of water at sea level (in Celsius)?',
    //     answer: '100',
    //     options: ['50', '100', '150', '200'],
    //   },
    // ];

    // // Add data to MongoDB
    // const addQuestions = async () => {
    //   try {
    //     await Questions.insertMany(questionsData);
    //     console.log(
    //       'Data added successfully================================================================>',
    //     );
    //   } catch (error) {
    //     console.error('Error adding data:', error);
    //   }
    // };
    // addQuestions();

    const teamId = req.body.teamId;
    const playerId = req.body.playerId;
    // add member in team
    try {
      const data = await TeamModel.findOne({});
      console.log({ data });
    } catch (error) {
      console.log('Error', error);
    }
    console.log({ first: teamId, second: playerId });
    TeamModel.findOne({ teamId: teamId })
      .then(doc => {
        if (!doc) {
          console.error('JoinTeam: Document not found');
          return;
        }
        doc.player.push(playerId);
        return doc
          .save()
          .then(updatedDoc => {
            console.log('Element inserted successfully:', updatedDoc);
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });

    //add teamId in member table
    await PlayerModel.findOneAndUpdate(
      { playerId: playerId },
      { teamId: teamId },
    );
    res.send(req.body);
  };

  static saveAttendedQuestions = async (req, res) => {
    // const playerId = req.body.playerId;
    const { playerId, question, answer } = req.body;
    const questionObject = [question, answer];
    // add member in team

    PlayerModel.findOne({ playerId: playerId })
      .then(doc => {
        if (!doc) {
          console.error('Document not found');
          return;
        }
        doc.questionsList.push(questionObject);
        return doc
          .save()
          .then(updatedDoc => {
            console.log('Element inserted successfully:', updatedDoc);
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });

    //add teamId in member table

    res.send(`${playerId}, ${question}, ${answer}`);
  };

  static HostActions = async (req, res) => {
    const { Action, hostId, password } = req.body;

    switch (Action) {
      case 'login':
        const data = await GameModel.find();
        hostId === data[0].hostId
          ? password === data[0].password
            ? res.send(`${data}`)
            : res.send(`Invalid credential`)
          : res.send(`Invalid credential`);

        break;
      case 'gameStart':
        console.log('gameStart');
        const credential = await GameModel.find();
        if (
          password === credential[0].password &&
          hostId === credential[0].hostId
        ) {
          await GameModel.findByIdAndUpdate('6467145edc6f653dd7fa5f35', {
            gameStart: true,
          });
          res.send(`Game Started`);
        } else {
          res.send(`Invalid credential`);
        }

        break;

      default:
        res.send(`Invalid Action`);
    }
  };

  static GetQuestion = async (req, res) => {
    console.log('f');
    const QuestionData = await GameModel.find();
    const data = await Questions.find();
    // console.log(data[QuestionData[0].question - 1]);
    res.status(200).json(data[QuestionData[0].question - 1]);
  };

  static ChangeQuestion = async (req, res) => {
    const QuestionIndex = req.body.questionIndex;
    const changeQue = await GameModel.findByIdAndUpdate(
      '6467145edc6f653dd7fa5f35',
      {
        question: QuestionIndex,
      },
    );
    changeQue;
    res.status(200).json(changeQue);
  };
}

module.exports = QuizController;
