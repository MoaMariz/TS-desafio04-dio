import { UserController } from "./UserController";
import { UserService } from '../services/UserService';
import { Request } from 'express';
import { makeMockResponse } from "../__mocks__/mockResponse.mock";


describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue([
            { name: 'Moacir', email: 'moa@test.com' },
            { name: 'Joana', email: 'joana@test.com' }
        ]),
        deleteUser: jest.fn()
    };

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Moacir',
                email: 'moa@teste.bank'
            }
        } as Request
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' });
    });

    it('Verificar a resposta de erro caso o usuário não informe o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'moa@teste.bank'
            }
        } as Request
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' });
    });

    it('Verificar a resposta de erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Moacir',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' });
    });

    it('Deve retornar todos os usuários', () => {
        const mockRequest = {} as Request;
        const mockResponse = makeMockResponse();
        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject([
            { name: 'Moacir', email: 'moa@test.com' },
            { name: 'Joana', email: 'joana@test.com' }
        ]);
    });

    it('Deve deletar um usuário existente', () => {
        const mockRequest = {
            body: {
                email: 'moa@test.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        (mockUserService.deleteUser as jest.Mock).mockReturnValueOnce(true);
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' });
    });
});
