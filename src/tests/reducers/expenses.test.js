import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state',()=>{
    const state = expensesReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual([]);
})

test('should remove expense by id',()=>{
    const action = {
        type:'REMOVE_EXPENSE',
        id:expenses[1].id
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[0],expenses[2]]);
});

test('should not remove expense if id not found',()=>{
    const action = {
        type:'REMOVE_EXPENSE',
        id:'-1'
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});

test('should add an expense',()=>{
    const expense = {
        id: '4',
        description: 'internet bill',
        amount: 450,
        createdAt: moment(),
        note: ''
    }
    const action = {
        type:'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([...expenses,expense]);
});

test('should edit an expense by id',()=>{
    const action = {
        type:'EDIT_EXPENSE',
        id:expenses[1].id,
        updates:{
            note:'new note added'
        }
    }
    const state = expensesReducer(expenses,action);
    expect(state[1].note).toEqual('new note added');
});

test('should not edit an expense if not found',()=>{
    const action = {
        type:'EDIT_EXPENSE',
        id: '-1',
        updates:{
            note:'not found'
        }
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});