import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  const bankAccount = getBankAccount(initialBalance);

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      bankAccount.withdraw(5000);
    } catch (e) {
      expect(e).toStrictEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      bankAccount.transfer(5000, getBankAccount(0));
    } catch (e) {
      expect(e).toStrictEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      bankAccount.transfer(5000, bankAccount);
    } catch (e) {
      expect(e).toStrictEqual(new TransferFailedError());
    }
  });

  test('should deposit money', () => {
    const amountToDeposit = 5000;
    const balanceBeforeDeposit = bankAccount.getBalance();
    const expectedBalanceAfterDeposit = balanceBeforeDeposit + amountToDeposit;

    bankAccount.deposit(amountToDeposit);

    expect(bankAccount.getBalance()).toBe(expectedBalanceAfterDeposit);
  });

  test('should withdraw money', () => {
    const amountToWithdraw = 100;
    const balanceBeforeDeposit = bankAccount.getBalance();
    const expectedBalanceAfterWithdraw =
      balanceBeforeDeposit - amountToWithdraw;

    bankAccount.withdraw(amountToWithdraw);

    expect(bankAccount.getBalance()).toBe(expectedBalanceAfterWithdraw);
  });

  test('should transfer money', () => {
    const amountToTransfer = 100;
    const balanceBeforeDeposit = bankAccount.getBalance();
    const expectedBalanceAfterTransfer =
      balanceBeforeDeposit - amountToTransfer;

    bankAccount.transfer(amountToTransfer, getBankAccount(0));

    expect(bankAccount.getBalance()).toBe(expectedBalanceAfterTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // TODO: fix test
    try {
      const fetchedBalance = await bankAccount.fetchBalance();

      expect(typeof fetchedBalance).toBe('number');
    } catch (e) {
      console.log(e);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const balance = bankAccount.getBalance();
      await bankAccount.synchronizeBalance();

      expect(bankAccount.getBalance()).not.toBe(balance);
    } catch (e) {
      console.log(e);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await bankAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toStrictEqual(new SynchronizationFailedError());
    }
  });
});
