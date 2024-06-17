import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log');
        userService.createUser('moacir', 'moa@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb);
    })

    it('Deve deletar um usuário existente', () => {
        userService.createUser('moacir', 'moacir@test.com');
        const result = userService.deleteUser('moacir@test.com');
        expect(result).toBe(true);
    });
})
