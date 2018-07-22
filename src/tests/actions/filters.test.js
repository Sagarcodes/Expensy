import moment from 'moment';
import {setTextFilter,setStartDate,setEndDate,sortByDate,sortByAmount} from '../../actions/filters';

test('generate set text filter action object with no input text',() => {
    const action = setTextFilter();
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:''
    });
});

test('generate set text filter action object with provided text',() => {
    const action = setTextFilter('bill');
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:'bill'
    });
});

test('generate set start date action object',() => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type:'SET_START_DATE',
        date:moment(0)
    });
});

test('generate set end date action object',() => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type:'SET_END_DATE',
        date:moment(0)
    });
});

test('generate sort by date action object',() => {
    const action = sortByDate();
    expect(action).toEqual({
        type:'SORT_BY_DATE'
    });
});

test('generate sort by amount action object',() => {
    const action = sortByAmount();
    expect(action).toEqual({
        type:'SORT_BY_AMOUNT'
    });
});