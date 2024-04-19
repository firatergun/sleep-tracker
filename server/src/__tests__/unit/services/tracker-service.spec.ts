import {
    createSleepData,
    findAllUsersWithSleepData,
    findTotalSleepDurationsForLastSevenDays,
    findUniqueByName,
    findUniqueUserById,
    getSleepDataForUserByDate
} from "../../../db/trackerRepo";
import { getPropertyByName } from '../../../db/propertiesRepo';
import * as trackerService from '../../../services/tracker-service';
import { SYS_DATE } from '../../../utils/const';
import { formatDate } from '../../../utils/utils';
import { SubmitDataInput } from "../../../schema/tracker-schema";
import { SleepData, User } from "@prisma/client";

jest.mock('../../../db/trackerRepo');
jest.mock('../../../db/propertiesRepo');

const mockedFindUniqueByName = jest.mocked(findUniqueByName);
const mockedGetPropertyByName = jest.mocked(getPropertyByName);
const mockedGetSleepDataForUserByDate = jest.mocked(getSleepDataForUserByDate);
const mockedCreateSleepData = jest.mocked(createSleepData);
const mockedFindAllUsersWithSleepData = jest.mocked(findAllUsersWithSleepData);
const mockedFindUniqueUserById = jest.mocked(findUniqueUserById);
const mockedFindTotalSleepDurationsForLastSevenDays = jest.mocked(findTotalSleepDurationsForLastSevenDays);

beforeEach(() => {
    jest.clearAllMocks();
    mockedGetPropertyByName.mockResolvedValue({ name: SYS_DATE, value: sysDateValue });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

const sysDateValue = formatDate(new Date('2024-04-14'));


describe('Tracker-Service Tests', () => {
    const mockInput: SubmitDataInput['body']= {
        name: 'Firat',
        gender: 'male',
        duration: '5'
    };
    
    const mockUserData = {
        id: 1,
        name: 'Firat',
        gender: 'male',
    };
    describe('submitService Tests', () => {

        const createUserWithSleepDataSpy = jest.spyOn(trackerService, 'createUserWithSleepData').mockImplementation(jest.fn());

        it('Should create non-existing user and submit sleep duration', async () => { 
            mockedFindUniqueByName.mockResolvedValueOnce(null);                        

            await trackerService.submitService(mockInput);
            expect(mockedFindUniqueByName).toBeCalledTimes(1);
            expect(createUserWithSleepDataSpy).toBeCalledTimes(1);
        });
        
        it('Should submit sleep duration for existing user', async () => {
            mockedFindUniqueByName.mockResolvedValueOnce(mockUserData as User);                        
            mockedGetSleepDataForUserByDate.mockResolvedValueOnce([]);

            await trackerService.submitService(mockInput);
            expect(mockedFindUniqueByName).toBeCalledTimes(1);
            expect(mockedFindUniqueByName).toBeCalledWith(mockInput.name)
            expect(createUserWithSleepDataSpy).toBeCalledTimes(0);
            expect(mockedGetSleepDataForUserByDate).toBeCalledTimes(1);
            expect(mockedCreateSleepData).toBeCalledTimes(1);
        });

        it('Should throw error when sleep total duration exceeds 24 hours', async () => {
            mockedFindUniqueByName.mockResolvedValueOnce(mockUserData as User);                        
            mockedGetSleepDataForUserByDate.mockResolvedValueOnce([ { duration: 24 } as SleepData]);

            expect(async () => await trackerService.submitService(mockInput)).rejects.toThrowError('Cannot log more then 24 hour per day');
            expect(mockedFindUniqueByName).toBeCalledTimes(1);
            expect(mockedGetSleepDataForUserByDate).toBeCalledTimes(0);
            expect(createUserWithSleepDataSpy).toBeCalledTimes(0);
            expect(mockedCreateSleepData).toBeCalledTimes(0);
        });
    });

    describe('getUsersDataService Tests', () => {
        it('Should find all users with sleep logs', async () => {
            mockedFindAllUsersWithSleepData.mockResolvedValueOnce([]);
            await trackerService.getUsersDataService();
            expect(mockedFindAllUsersWithSleepData).toBeCalledTimes(1);
        });
    });

    describe('getUserChartDataService Tests', () => {
        it('Should Throw Error if user does not exits', async () => {
            expect(async () => await trackerService.getUserChartDataService(1)).rejects.toThrowError('Not Found');
        });

        it('Should return chart data for given user from sysdate to 7 days before be if exists', async () => {
            const expectedResponse = {
                name: 'Firat',
                gender: 'male',
                dates: [
                    '2024-04-07',
                    '2024-04-08',
                    '2024-04-09',
                    '2024-04-10',
                    '2024-04-11',
                    '2024-04-12',
                    '2024-04-13',
                    '2024-04-14'
                ],
                durations: [
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
            };
            mockedFindUniqueUserById.mockResolvedValueOnce(mockUserData as User);
            mockedFindTotalSleepDurationsForLastSevenDays.mockResolvedValueOnce([]);
            const response = await trackerService.getUserChartDataService(1);
            expect(mockedFindUniqueUserById).toBeCalledTimes(1);
            expect(mockedFindUniqueUserById).toBeCalledWith(1);
            expect(mockedFindTotalSleepDurationsForLastSevenDays).toBeCalledTimes(1);
            expect(mockedFindTotalSleepDurationsForLastSevenDays).toBeCalledWith(1, '2024-04-07', sysDateValue);
            expect(response).toEqual(expect.objectContaining(expectedResponse));
        });
    });
})