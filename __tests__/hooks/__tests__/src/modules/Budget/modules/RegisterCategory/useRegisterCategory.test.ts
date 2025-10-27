
import { act, renderHook } from '@testing-library/react';
import { useRegisterCategory } from '../useRegisterCategory';
import { showToast } from '@commons/utils/helpers';
import { registerCategory } from '@services/api';
import { useCategoriesStore } from '@modules/Budget/store';

jest.mock('@commons/utils/helpers', () => ({
  showToast: jest.fn(),
}));

jest.mock('@services/api', () => ({
  registerCategory: jest.fn(),
}));

jest.mock('@modules/Budget/store', () => ({
  useCategoriesStore: jest.fn(),
}));

const mockGetCategories = jest.fn();
const mockOnCloseBottomSheet = jest.fn();

describe('useRegisterCategory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCategoriesStore as jest.Mock).mockReturnValue({
      categories: [],
      getCategories: mockGetCategories,
    });
  });

  it('deve lidar com a mudança de input', () => {
    const { result } = renderHook(() =>
      useRegisterCategory(mockOnCloseBottomSheet),
    );
    act(() => {
      result.current.handleChangeText('Nova Categoria');
    });
    expect(result.current.value).toBe('Nova Categoria');
  });

  it('deve lidar com a seleção de tipo', () => {
    const { result } = renderHook(() =>
      useRegisterCategory(mockOnCloseBottomSheet),
    );
    act(() => {
      result.current.handleSelectType('CREDITO');
    });
    expect(result.current.type).toBe('CREDITO');
  });

  describe('handleRegister', () => {
    it('deve exibir erro se o nome da categoria for inválido', async () => {
      const { result } = renderHook(() =>
        useRegisterCategory(mockOnCloseBottomSheet),
      );

      act(() => {
        result.current.handleChangeText('a');
      });

      await act(async () => {
        await result.current.handleRegister();
      });

      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'O nome da categoria deve ter entre 2 e 50 caracteres',
      });
      expect(registerCategory).not.toHaveBeenCalled();
    });

    it('deve registrar uma nova categoria com sucesso', async () => {
      (registerCategory as jest.Mock).mockResolvedValueOnce({});
      const { result } = renderHook(() =>
        useRegisterCategory(mockOnCloseBottomSheet),
      );

      act(() => {
        result.current.handleChangeText('Categoria Válida');
      });

      await act(async () => {
        await result.current.handleRegister();
      });

      expect(registerCategory).toHaveBeenCalledWith({
        name: 'Categoria Válida',
        type: 'DEBITO',
      });
      expect(showToast).toHaveBeenCalledWith({
        type: 'success',
        message: 'Categoria cadastrada',
      });
      expect(mockGetCategories).toHaveBeenCalled();
      expect(mockOnCloseBottomSheet).toHaveBeenCalled();
      expect(result.current.value).toBe('');
    });

    it('deve lidar com erro ao registrar uma nova categoria', async () => {
      (registerCategory as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
      const { result } = renderHook(() =>
        useRegisterCategory(mockOnCloseBottomSheet),
      );

      act(() => {
        result.current.handleChangeText('Categoria Válida');
      });

      await act(async () => {
        await result.current.handleRegister();
      });

      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'Erro ao cadastrar categoria',
      });
    });

    it('deve registrar uma nova subcategoria com sucesso', async () => {
      (registerCategory as jest.Mock).mockResolvedValueOnce({});
      const { result } = renderHook(() =>
        useRegisterCategory(mockOnCloseBottomSheet),
      );

      act(() => {
        result.current.setIsCategory(false);
        result.current.setCategoryName('Pai');
        result.current.handleChangeText('Subcategoria Válida');
      });

      await act(async () => {
        await result.current.handleRegister();
      });

      expect(registerCategory).toHaveBeenCalledWith({
        name: 'Subcategoria Válida',
        category: 'Pai',
        type: 'DEBITO',
      });
      expect(showToast).toHaveBeenCalledWith({
        type: 'success',
        message: 'Subcategoria cadastrada',
      });
    });
  });
});
