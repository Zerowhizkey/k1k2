import React from "react";
import Caldendar from "../src/pages/Calendar";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectProvider } from "../src/context/ProjectContext";
describe("Calendar", () => {
	it("Render header", async () => {
		render(
			<ProjectProvider>
				<Caldendar />
			</ProjectProvider>
		);
		const header = screen.getByText("Calendar");
		screen.debug();
		expect(header).toBeInTheDocument();
	});
});
