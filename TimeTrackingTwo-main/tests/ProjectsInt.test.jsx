import { render, screen } from "@testing-library/react";
import { ProjectProvider } from "../src/context/ProjectContext";
import Projects from "../src/components/Projects";
import { buildHandlers } from "../mocks/handlers";
import { setupServer } from "msw/node";
import { beforeAll, expect, test } from "vitest";

const config = {
	baseUrl: "https://silk-sapphire-houseboat.glitch.me",
	projectId: "12",
	userId: "1",
	userName: "Mackish",
	projectName: "Värsta project",
	color: "röd lol",
	rate: 123,
};
const server = setupServer(...buildHandlers(config));

beforeAll(() => server.listen());

test("Render Projects", async () => {
	render(
		<ProjectProvider>
			<Projects></Projects>
		</ProjectProvider>
	);

	const projects = await screen.findByText("Värsta project");

	expect(projects).toBeInTheDocument();
	screen.debug();
});
