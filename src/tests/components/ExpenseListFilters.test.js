import React from 'react';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters,altFilters} from '../fixtures/filters';
import {shallow} from 'enzyme';
import moment from 'moment'; 
import expenses from '../fixtures/expenses';

let setTextFilter,setStartDate,setEndDate,sortByDate,sortByAmount,wrapper;

beforeEach(()=>{
    setTextFilter = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            setTextFilter={setTextFilter}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            filters={filters}
        />
    );
});

test('should render ExpenseListFilters correctly',()=>{
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt filters correctly',()=>{
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change',() => {
    const value = 'rent';
    wrapper.find('input').simulate('change',{
        target: {
            value
        }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle sort change to amount',() => {
    const value = 'amount'
    wrapper.find('select').simulate('change',{
        target: {
            value
        }
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle sort change to date',() => {
    const value = 'date'
    wrapper.find('select').simulate('change',{
        target: {
            value
        }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should handle dates change',() => {
    const startDate = moment(0);
    const endDate = moment(0).add(1,'days');
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate,endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle calendarFocus change',() => {
    const calendarFocused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});

