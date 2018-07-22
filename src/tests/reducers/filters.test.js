import moment from "moment";
import filtersReducer from '../../reducers/filters';

test('should set up default filter values',() => {
    const state = filtersReducer(undefined,{type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        sortBy: 'date'
    });
});

test('should set sortBy to amount',() => {
    const state = filtersReducer(undefined,{type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date',() => {
    const curState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    }
    const state = filtersReducer(curState,{type: 'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
});

test('should set text filter to amount',() => {
    const state = filtersReducer(undefined,{type: 'SET_TEXT_FILTER', text:'bill'});
    expect(state.text).toBe('bill');
});

test('should set start date',() => {
    const action = {
        type: 'SET_START_DATE',
        date: moment(0).startOf('month').subtract(3,'months')
    }
    const state = filtersReducer(undefined,action);
    expect(state.startDate).toEqual(moment(0).startOf('month').subtract(3,'months'));
});

test('should set end date',() => {
    const action = {
        type: 'SET_END_DATE',
        date: moment(0).startOf('month').add(2,'months')
    }
    const state = filtersReducer(undefined,action);
    expect(state.endDate).toEqual(moment(0).startOf('month').add(2,'months'));
});
