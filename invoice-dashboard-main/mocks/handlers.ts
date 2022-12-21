import { rest } from 'msw';

type Config = {
    baseUrl: string;
    projectId?: string;
    userId?: string;
    userName?: string;
    invoiceId?: string;
    dueDate?: number;
    amount?: number;
    create_date?: number;
    taskTitle?: string;
    timerStart?: number;
    timerStop?: number;
    taskId?: string;
    timelogId?: string;
    projectName?: string;
    color?: string;
    rate?: number;
};

export const buildHandlers = (config: Config) => {
    const {
        baseUrl,
        projectId,
        userId,
        userName,
        invoiceId,
        dueDate,
        amount,
        create_date,
        taskTitle,
        timerStart,
        timerStop,
        timelogId,
        taskId,
        projectName,
        color,
        rate,
    } = config;
    let projectList = [
        {
            id: projectId,
            userId,
            name: projectName,
            color: color,
            hourly_rate: rate,
        },
    ];
    let taskList = [
        {
            id: taskId,
            userId: userId,
            projectId: projectId,
            title: taskTitle,
        },
    ];

    const invoiceList = [
        {
            id: invoiceId,
            status: 'ej betald',
            due_date: dueDate,
            amount: amount,
            customer: userName,
            create_date: create_date,
        },
    ];
    return [
        rest.get(baseUrl + '/projects', (req, res, ctx) => {
            return res(ctx.json(projectList));
        }),
        rest.delete(baseUrl + '/projects/:id', (req, res, ctx) => {
            projectList = projectList.filter((p) => p.id !== req.params.id);
            return res(ctx.status(200));
        }),
        rest.get(baseUrl + '/users', (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        id: userId,
                        name: userName,
                    },
                ])
            );
        }),
        rest.get(baseUrl + '/invoices', (req, res, ctx) => {
            return res(ctx.json(invoiceList));
        }),
        rest.post(baseUrl + '/invoices', (req, res, ctx) => {
            return res(ctx.json(invoiceList));
        }),
        rest.get(baseUrl + '/tasks', (req, res, ctx) => {
            return res(ctx.json(taskList));
        }),
        rest.delete(baseUrl + '/tasks/:id', (req, res, ctx) => {
            taskList = taskList.filter((t) => t.id !== req.params.id);
            return res(ctx.status(200));
        }),
        rest.get(baseUrl + '/timelogs', (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        id: timelogId,
                        userId: userId,
                        projectId: projectId,
                        taskId: taskId,
                        timerStart: timerStart,
                        timerStop: timerStop,
                    },
                ])
            );
        }),
    ];
};
