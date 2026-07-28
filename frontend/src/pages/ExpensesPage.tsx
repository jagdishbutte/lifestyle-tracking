
const ExpensesPage = () => {
    // const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

    // const [selectedMonth, setSelectedMonth] = useState(
    //     new Date().toISOString().slice(0, 7),
    // );

    // const [showModal, setShowModal] = useState(false);

    // const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

    // const filteredExpenses = useMemo(() => {
    //     return expenses.filter(
    //         (expense) => expense.date.slice(0, 7) === selectedMonth,
    //     );
    // }, [expenses, selectedMonth]);

    // const totalExpenses = filteredExpenses.reduce(
    //     (sum, expense) => sum + expense.amount,
    //     0,
    // );

    // const handleAddExpense = () => {
    //     setEditingExpense(null);

    //     setShowModal(true);
    // };

    // const handleEditExpense = (expense: Expense) => {
    //     setEditingExpense(expense);

    //     setShowModal(true);
    // };

    // const handleDeleteExpense = (id: number) => {
    //     const confirmed = window.confirm("Delete this expense?");

    //     if (!confirmed) return;

    //     setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    // };

    // const handleSaveExpense = (expenseData: Omit<Expense, "id">) => {
        // if (editingExpense) {
        //     setExpenses((prev) =>
        //         prev.map((expense) =>
        //             expense.id === editingExpense.id
        //                 ? {
        //                       ...expense,
        //                       ...expenseData,
        //                   }
        //                 : expense,
        //         ),
        //     );

        //     setEditingExpense(null);
        //     setShowModal(false);

        //     return;
        // }

        // const newExpense: Expense = {
        //     id: Date.now(),
        //     ...expenseData,
        // };

        // setExpenses((prev) => [newExpense, ...prev]);
    // };

    // const categoryBreakdown = expenseCategories
        // .map((category) => {
        //     const amount = filteredExpenses
        //         .filter((expense) => expense.category === category)
        //         .reduce((sum, expense) => sum + expense.amount, 0);

        //     return {
        //         category,
        //         amount,
        //     };
        // })
        // .filter((item) => item.amount > 0);

    return (
        <>
            
        </>
    );
};

export default ExpensesPage;
