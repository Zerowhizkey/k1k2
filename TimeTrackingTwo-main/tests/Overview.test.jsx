import React from "react";
import Overview from "../src/pages/Overview";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectProvider } from "../src/context/ProjectContext";
describe("Overview", () => {
	it("Render header", async () => {
		render(
			<ProjectProvider>
				<Overview />
			</ProjectProvider>
		);
		const header = screen.getByText("Overview");
		screen.debug();
		expect(header).toBeInTheDocument();
	});
});
