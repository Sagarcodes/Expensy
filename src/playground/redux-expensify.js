import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//action : ADD_EXPENSE
const addExpense = ({
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id,updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
})

const expensesReducerDefaultState = [];
//what to do when action occur? -> Reducer
const expensesReducer = (state = expensesReducerDefaultState,action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];

        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => (id !== action.id));
        
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
                else {
                    return expense;
                }
            });

        default:
            return state;
    }
}

const setTextFilter = (text = '') => ({
    type:'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type:'SORT_BY_AMOUNT'
})

const sortByDate = () => ({
    type:'SORT_BY_DATE'
})

const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
})

const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
})

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState,action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };

        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
           
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
         
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
           
        case 'SET_END_DATE':
        return {
            ...state,
            endDate: action.date
        }    
            
        default:
            return state;
    }
}

//timestamps -> milliseconds
//start from january 1st,1970 (unix epoch)

const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        //more recent will come first
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt? 1 : -1; // one with -1 will come first
        }
        //more expensive will come first
        else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    })
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters)
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent',amount: 100,createdAt: -1100})); //returns actions object
const expenseTwo = store.dispatch(addExpense({description: 'Coffee',amount: 300,createdAt: -250}));

// store.dispatch(removeExpense({id:expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id,{amount:500}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(100));
// store.dispatch(setStartDate(0));
// store.dispatch(setEndDate(1250));


const demoState = {
    expenses:[{
        id: 'sofboafq',
        description: 'January Rent',
        note: 'This was the last lent for that address',
        amount: 54500,
        createdAt: 0
    }],
    filter:{
        text: 'rent',
        sortBy: 'amount', //date, or amount
        startDate: undefined,
        endDate: undefined
    }
}
