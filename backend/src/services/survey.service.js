export class SurveyService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async updateUserSurveyFields(email, fieldsToUpdate) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found!');
    }
    return this.userRepository.updateUserFieldsById(user.id, fieldsToUpdate);
  }

  async getGeneralSurveyInfo(email, age, gender, height, weight) {
    return this.updateUserSurveyFields(email, { age, gender, height, weight });
  }

  async getHealthSurveyInfo(
    email,
    contraindications,
    fitnessLevels,
    numberOfRecentWorkouts,
    restrictions,
    trainingExperience
  ) {
    return this.updateUserSurveyFields(email, {
      contraindications,
      fitnessLevels,
      numberOfRecentWorkouts,
      restrictions,
      trainingExperience,
    });
  }

  async getTrainingSurveyInfo(
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
  ) {
    return this.updateUserSurveyFields(email, {
      goal,
      additionalGoal,
      trainingPlaces,
      equipment,
      trainingDays,
      trainingTime,
      trainingStyle,
      supportLevel,
      isSurveyCompleted,
    });
  }
}
