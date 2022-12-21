import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ProjectProvider } from "../src/context/ProjectContext";
import Users from "../src/pages/Users";
import { buildHandlers } from "../mocks/handlers";
import { setupServer } from "msw/node";
import { beforeAll, expect, test } from "vitest";

const config = {
	baseUrl: "https://silk-sapphire-houseboat.glitch.me",
	userId: "1",
	userName: "Mackish",
};
const server = setupServer(...buildHandlers(config));

beforeAll(() => server.listen());

test("Render Projects and removes", async () => {
	render(
		<ProjectProvider>
			<Users></Users>
		</ProjectProvider>
	);

	const users = await waitFor(() => screen.getByText("Mackish"));

	expect(users).toBeInTheDocument();
	screen.debug();
});
