import { useState } from 'react';
import {
    Dashboard,
    Projects,
    Tasks,
    Timelogs,
    InvoiceOverview,
    Invoice,
} from '@/pages/index';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
} from '@mantine/core';

function AppShellLayout() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const handleBurger = () => {
        if (opened) {
            setOpened(false);
        }
    };

    return (
        <BrowserRouter>
            <AppShell
                styles={{
                    main: {
                        background:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint='sm'
                asideOffsetBreakpoint='sm'
                navbar={
                    <Navbar
                        p='md'
                        hiddenBreakpoint='sm'
                        hidden={!opened}
                        width={{ sm: 200, lg: 300 }}
                    >
                        <Text>Application navbar</Text>
                        <Navbar.Section grow mt='lg'>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Link to={'/'} onClick={handleBurger}>
                                    Dashboard
                                </Link>
                                <Link to={'projects'} onClick={handleBurger}>
                                    Projects
                                </Link>
                                <Link to={'tasks'} onClick={handleBurger}>
                                    Tasks
                                </Link>
                                <Link to={'timelogs'} onClick={handleBurger}>
                                    Timelogs
                                </Link>
                                <Link
                                    to={'invoiceoverview'}
                                    onClick={handleBurger}
                                >
                                    Invoice Dashboard
                                </Link>
                                <Link to={'invoice'} onClick={handleBurger}>
                                    Invoice
                                </Link>
                            </div>
                        </Navbar.Section>
                    </Navbar>
                }
                header={
                    <Header height={{ base: 50, md: 70 }} p='md'>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <MediaQuery
                                largerThan='sm'
                                styles={{ display: 'none' }}
                            >
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size='sm'
                                    color={theme.colors.gray[6]}
                                    mr='xl'
                                />
                            </MediaQuery>
                            <Text>PIRIOSOS</Text>
                        </div>
                    </Header>
                }
            >
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='projects' element={<Projects />} />
                    <Route path='tasks' element={<Tasks />} />
                    <Route path='timelogs' element={<Timelogs />} />
                    <Route
                        path='invoiceoverview'
                        element={<InvoiceOverview />}
                    />
                    <Route path='invoice' element={<Invoice />} />
                </Routes>
            </AppShell>
        </BrowserRouter>
    );
}
export default AppShellLayout;
