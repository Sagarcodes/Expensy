import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses';

test('should return 0 is no expenses',() => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
})

test('should correctly add up single expense',() => {
    const res = selectExpensesTotal([expenses[0]]);
    expect(res).toBe(expenses[0].amount);
})

test('should correctly add up multiple expenses',() => {
    const res = selectExpensesTotal(expenses);
    const sum = expenses[0].amount + expenses[1].amount + expenses[2].amount;
    expect(res).toBe(sum);
})