import { act, renderHook } from '@testing-library/react';
import { useEditCategory } from '../useEditCategory';
import { showToast } from '@commons/utils/helpers';
import { updateCategories } from '@services/api';
import { useCategoriesStore, useHistoryStore } from '@modules/Budget/store';

jest.mock('@commons/utils/helpers', () => ({
  showToast: jest.fn(),
}));

jest.mock('@services/api', () => ({
  updateCategories: jest.fn(),
}));

jest.mock('@modules/Budget/store', () => ({
  useCategoriesStore: jest.fn(),
  useHistoryStore: jest.fn(),
}));

const mockGetCategories = jest.fn();
const mockRefetchHistory = jest.fn();
const mockHandleCloseBottomSheet = jest.fn();

describe('useEditCategory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCategoriesStore as jest.Mock).mockReturnValue({
      categories: [],
      getCategories: mockGetCategories,
    });
    (useHistoryStore as jest.Mock).mockReturnValue({
      refetchHistory: mockRefetchHistory,
    });
  });

  const initialProps = {
    handleCloseBottomSheet: mockHandleCloseBottomSheet,
    isCategory: true,
  };

  it('deve lidar com a mudança de texto', () => {
    const { result } = renderHook(() => useEditCategory(initialProps));
    act(() => {
      result.current.handleChangeText('Novo Nome');
    });
    expect(result.current.value.category).toBe('Novo Nome');
  });

  it('deve lidar com a seleção de categoria', () => {
    const { result } = renderHook(() => useEditCategory(initialProps));
    const selectedItem = { category: 'Selecionado', id: '1', isDefault: false };
    act(() => {
      result.current.handleSelectedCategory(selectedItem);
    });
    expect(result.current.value).toEqual(selectedItem);
  });

  describe('handleEditCategory', () => {
    it('deve exibir erro se o nome da categoria for inválido e não chamar sendData', async () => {
      const { result } = renderHook(() => useEditCategory(initialProps));
      act(() => {
        result.current.handleChangeText('a');
      });

      await act(async () => {
        await result.current.handleEditCategory();
      });

      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'O nome da categoria deve ter entre 2 e 50 caracteres',
      });
      expect(updateCategories).not.toHaveBeenCalled();
    });

    it('deve chamar sendData ao editar uma categoria válida', async () => {
      (updateCategories as jest.Mock).mockResolvedValueOnce({});
      const { result } = renderHook(() => useEditCategory(initialProps));

      act(() => {
        result.current.handleSelectedCategory({ category: 'Nome Antigo', id: '1', isDefault: false });
        result.current.handleChangeText('Novo Nome Válido');
      });

      await act(async () => {
        await result.current.handleEditCategory();
      });

      expect(updateCategories).toHaveBeenCalledWith({
        id: '1',
        newCategory: 'Novo Nome Válido',
        categoryType: 'category',
      });
      expect(showToast).toHaveBeenCalledWith({
        type: 'success',
        message: 'Categoria editada',
      });
      expect(mockGetCategories).toHaveBeenCalled();
      expect(mockRefetchHistory).toHaveBeenCalled();
      expect(mockHandleCloseBottomSheet).toHaveBeenCalled();
    });

    it('deve chamar sendData ao editar uma subcategoria válida', async () => {
        (updateCategories as jest.Mock).mockResolvedValueOnce({});
        const { result } = renderHook(() => useEditCategory({ ...initialProps, isCategory: false }));
  
        act(() => {
          result.current.setCategoryFather('Pai');
          result.current.handleSelectedCategory({ category: 'Sub Antiga', id: '2', isDefault: false });
          result.current.handleChangeText('Nova Sub Válida');
        });
  
        await act(async () => {
          await result.current.handleEditCategory();
        });
  
        expect(updateCategories).toHaveBeenCalledWith({
          id: '2',
          newCategory: 'Nova Sub Válida',
          categoryType: 'subcategory',
        });
        expect(showToast).toHaveBeenCalledWith({
          type: 'success',
          message: 'Subcategoria editada',
        });
      });

    it('deve lidar com erro da API em sendData', async () => {
      (updateCategories as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
      const { result } = renderHook(() => useEditCategory(initialProps));

      act(() => {
        result.current.handleChangeText('Nome Válido');
      });

      await act(async () => {
        await result.current.handleEditCategory();
      });

      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'Erro ao editar categoria',
      });
      expect(mockGetCategories).not.toHaveBeenCalled();
    });
  });
});
