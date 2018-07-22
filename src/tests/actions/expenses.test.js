import {addExpense,removeExpense,editExpense} from '../../actions/expenses';

test('should setup edit expense action object',() => {
    const result = editExpense('123abcd',{note: 'new note value'});
    expect(result).toEqual({
        type:'EDIT_EXPENSE',
        id:'123abcd',
        updates:{
            note:'new note value'
        }
    })
})

test('should setup add expense action object with provided values',()=>{
    const expenseData = {
        description: 'Rent',
        amount: 1550,
        createdAt: 1000,
        note: 'Last month\'s rent'
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values',()=>{
    const defaultData = {
        description: '',
        amount: 0,
        createdAt: 0,
        note: ''
    }
    const action = addExpense(defaultData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...defaultData,
            id: expect.any(String)
        }
    });
});