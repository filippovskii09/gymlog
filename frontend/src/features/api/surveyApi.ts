import { SURVEY_ENDPOINTS } from '@/enums/survey.enum';
import { api } from './api';

const surveyApi = api.injectEndpoints({
  endpoints: (build) => ({
    setGeneralInfo: build.mutation({
      query: (body) => ({
        url: SURVEY_ENDPOINTS.GENERAL,
        method: 'POST',
        body,
      }),
    }),
    setHealthInfo: build.mutation({
      query: (body) => ({
        url: SURVEY_ENDPOINTS.HEALTH,
        method: 'POST',
        body,
      }),
    }),
    setTrainingInfo: build.mutation({
      query: (body) => ({
        url: SURVEY_ENDPOINTS.TRAINING,
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSetGeneralInfoMutation, useSetHealthInfoMutation, useSetTrainingInfoMutation } =
  surveyApi;
