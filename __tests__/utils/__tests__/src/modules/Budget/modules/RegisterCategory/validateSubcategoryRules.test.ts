import { showToast } from '@commons/utils/helpers';
import { validateSubcategoryRules } from '../validateSubcategoryRules';
import { TypeCategoryUnparsed } from '../../../EditTransaction/types';

jest.mock('@commons/utils/helpers', () => ({
  showToast: jest.fn(),
}));

const mockCategories: TypeCategoryUnparsed[] = [
  {
    category: 'Alimentação',
    id: '1',
    isDefault: false,
    subCategories: [
      { category: 'Restaurante', id: '101', isDefault: false },
      { category: 'Supermercado', id: '102', isDefault: false },
    ],
    type: 'CREDITO',
  },
  {
    category: 'Lazer',
    id: '2',
    isDefault: false,
    subCategories: [],
    type: 'CREDITO',
  },
]

describe('validateSubcategoryRules', () => {
  beforeEach(() => {
    (showToast as jest.Mock).mockClear();
  });

  it('deve retornar falso e exibir toast para nome de subcategoria menor que 2 caracteres', () => {
    const result = validateSubcategoryRules(mockCategories, 'Alimentação', 'a');
    expect(result).toBe(false);
    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'O nome da subcategoria deve ter entre 2 e 50 caracteres',
    });
  });

  it('deve retornar falso e exibir toast para nome de subcategoria maior que 50 caracteres', () => {
    const longName = 'a'.repeat(51);
    const result = validateSubcategoryRules(
      mockCategories,
      'Alimentação',
      longName,
    );
    expect(result).toBe(false);
    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'O nome da subcategoria deve ter entre 2 e 50 caracteres',
    });
  });

  it('deve lançar erro e exibir toast para uma subcategoria existente na mesma categoria', () => {
    expect(() =>
      validateSubcategoryRules(mockCategories, 'Alimentação', 'restaurante'),
    ).toThrow('Subcategoria já existe nesta categoria');
    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Subcategoria já existe nesta categoria',
    });
  });

  it('deve retornar verdadeiro para um nome de subcategoria válido e único', () => {
    const result = validateSubcategoryRules(
      mockCategories,
      'Alimentação',
      'Cafeteria',
    );
    expect(result).toBe(true);
    expect(showToast).not.toHaveBeenCalled();
  });

  it('deve retornar verdadeiro para uma subcategoria existente em uma categoria diferente', () => {
    const result = validateSubcategoryRules(
      mockCategories,
      'Lazer',
      'Restaurante',
    );
    expect(result).toBe(true);
    expect(showToast).not.toHaveBeenCalled();
  });

  it('deve lidar com nomes de categoria com espaços no início/fim', () => {
    expect(() =>
      validateSubcategoryRules(
        mockCategories,
        '  Alimentação  ',
        '  restaurante  ',
      ),
    ).toThrow('Subcategoria já existe nesta categoria');
  });
});
