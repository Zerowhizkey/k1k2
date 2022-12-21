import React from "react";
import Users from "../src/pages/Users";
import Timers from "../src/pages/Timers";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectProvider } from "../src/context/ProjectContext";
describe("Timers", () => {
	it("Render", async () => {
		render(
			<ProjectProvider>
				<Timers />
			</ProjectProvider>
		);
		const header = screen.getByText("Timer");
		screen.debug();
		expect(header).toBeInTheDocument();
	});
});
