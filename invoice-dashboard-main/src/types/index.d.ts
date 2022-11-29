interface ProviderProps {
    children?: React.ReactNode;
}
interface InvoiceContext {
    loading: boolean;
    item: ReducerState;
    addInvoice: (data: Invoice) => void;
    addHourly: (id: id, data: number) => void;
    deleteItem: (item: DataTypes, id: id) => void;
}

interface ReducerState {
    users: User[];
    projects: Project[];
    tasks: Task[];
    timelogs: Timelog[];
    invoices: Invoice[];
}

type Action =
    | { type: 'users'; data: User[] }
    | { type: 'projects'; data: Project[] }
    | { type: 'tasks'; data: Task[] }
    | { type: 'timelogs'; data: Timelog[] }
    | { type: 'invoices'; data: Invoice[] }
    | { type: 'addInvoice'; data: Invoice };

type User = {
    id: string;
    name: string;
};

type Project = {
    id: string;
    userId: string;
    name: string;
    color: string;
    hourly_rate: number;
};

type Task = {
    id: string;
    userId: string;
    projectId: string;
    title: string;
};

type Timelog = {
    id: string;
    userId: string;
    projectId: string;
    taskId: string;
    timerStart: number;
    timerStop: number;
};

type Invoice = {
    id: string;
    status: string;
    due_date: number;
    amount: number;
    customer: string;
    create_date: number;
};
