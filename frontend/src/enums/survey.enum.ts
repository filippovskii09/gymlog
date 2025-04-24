export enum SURVEY_ENDPOINTS {
  GENERAL = '/survey/general',
  HEALTH = '/survey/health',
  TRAINING = '/survey/training',
}

export enum SURVEY_GENRAL_ROUTES {
  AGE = '/survey/age',
  WEIGHT = '/survey/weight',
  HEIGHT = '/survey/height',
  GENDER = '/survey/gender',
}

export enum SURVEY_HEALTH_ROUTES {
  CONTRAINDICATIONS = '/survey/contraindications',
  RESTRICTIONS = '/survey/restrictions',
  FITNESS_LEVELS = '/survey/fitness-levels',
  RECENT_WORKOUTS = '/survey/recent-workouts',
  TRAINING_EXPERIENCE = '/survey/training-experience',
}

export enum SURVEY_TRAINING_ROUTES {
  GOAL = '/survey/goal',
  ADDITIONAL_GOAL = '/survey/additional-goal',
  TRAINING_PLACES = '/survey/training-places',
  EQUIPMENT = '/survey/equipment',
  TRAINING_TIME = '/survey/training-time',
  TRAINING_DAYS = '/survey/training-days',
  TRAINING_STYLE = '/survey/training-style',
  SUPPORT_LEVELS = '/survey/support-levels',
}

export enum SURVEY_SUCCESS_ROUTE {
  INDEX = '/survey/success',
}
