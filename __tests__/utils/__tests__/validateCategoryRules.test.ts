import { showToast } from '@commons/utils/helpers';
import { validateCategoryRules } from '../validateCategoryRules';
import { TypeCategoryUnparsed } from '../../../EditTransaction/types';

jest.mock('@commons/utils/helpers', () => ({
  showToast: jest.fn(),
}))

const mockCategories: TypeCategoryUnparsed[] = [
  {
    category: 'Lazer',
    id: '1',
    isDefault: false,
    subCategories: [],
    type: 'CREDITO',
  },
  {
    category: 'Alimentação',
    id: '2',
    isDefault: false,
    subCategories: [],
    type: 'CREDITO',
  },
]

describe('validateCategoryRules', () => {
  beforeEach(() => {
    (showToast as jest.Mock).mockClear();
  });

  it('deve retornar falso e exibir toast para nome de categoria menor que 2 caracteres', () => {
    const result = validateCategoryRules(mockCategories, 'a');
    expect(result).toBe(false);
    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'O nome da categoria deve ter entre 2 e 50 caracteres',
    });
  });

  it('deve retornar falso e exibir toast para nome de categoria maior que 50 caracteres', () => {
    const longName = 'a'.repeat(51);
    const result = validateCategoryRules(mockCategories, longName);
    expect(result).toBe(false);
    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'O nome da categoria deve ter entre 2 e 50 caracteres',
    });
  });

  it('deve lançar um erro e exibir toast para um nome de categoria existente (case-insensitive)', () => {
    expect(() => validateCategoryRules(mockCategories, 'lazer')).toThrow(
      'Categoria já existe',
    );
    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Categoria já existe',
    });
  });

  it('deve retornar verdadeiro para um nome de categoria válido e único', () => {
    const result = validateCategoryRules(mockCategories, 'Saúde');
    expect(result).toBe(true);
    expect(showToast).not.toHaveBeenCalled();
  });
});
