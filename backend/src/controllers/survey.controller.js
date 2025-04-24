export class SurveyController {
  constructor(surveyService) {
    this.surveyService = surveyService;
  }

  getGeneralSurveyInfo = async (req, res) => {
    try {
      const { email, age, gender, height, weight } = req.body;
      await this.surveyService.getGeneralSurveyInfo(email, age, gender, height, weight);

      res.status(200).json({ message: 'General info for survey added successfully!!!' });
    } catch (error) {
      console.error('Error in getGeneralSurveyInfo:', error);
      res.status(400).json({ message: error.message });
    }
  };

  getHealthSurveyInfo = async (req, res) => {
    try {
      const {
        email,
        contraindications,
        fitnessLevels,
        numberOfRecentWorkouts,
        restrictions,
        trainingExperience,
      } = req.body;

      await this.surveyService.getHealthSurveyInfo(
        email,
        contraindications,
        fitnessLevels,
        numberOfRecentWorkouts,
        restrictions,
        trainingExperience
      );

      res.status(200).json({ message: 'Health info for survey added successfully!!!' });
    } catch (error) {
      console.error('Error in getHealthSurveyInfo', error);
      res.status(400).json({ message: error.message });
    }
  };

  getTrainingSurveyInfo = async (req, res) => {
    try {
      const {
        email,
        goal,
        additionalGoal,
        trainingPlaces,
        equipment,
        trainingDays,
        trainingTime,
        trainingStyle,
        supportLevel,
        isSurveyCompleted,
      } = req.body;

      await this.surveyService.getTrainingSurveyInfo(
        email,
        goal,
        additionalGoal,
        trainingPlaces,
        equipment,
        trainingDays,
        trainingTime,
        trainingStyle,
        supportLevel,
        isSurveyCompleted
      );

      res.status(200).json({ message: 'Training info for survey added successfully!!!' });
    } catch (error) {
      console.error('Error in getTrainingSurveyInfo', error);
      res.status(400).json({ message: error.message });
    }
  };
}
