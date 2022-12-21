import React from "react";
import Overview from "../src/pages/Overview";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectProvider } from "../src/context/ProjectContext";
describe("Overview", () => {
	it("Render two buttons", async () => {
		render(
			<ProjectProvider>
				<Overview />
			</ProjectProvider>
		);
		const pageA = screen.getByTestId("btn1");
		const pageB = screen.getByTestId("btn2");

		expect(pageA).toBeInTheDocument();
		expect(pageB).toBeInTheDocument();

		it("Project page renders", async () => {
			fireEvent.click(pageA);
			expect(screen.getByText("Add a project")).toBeInTheDocument();
		});
		it("Task page renders", async () => {
			fireEvent.click(pageB);
			expect(screen.getByText("Add a task")).toBeInTheDocument();
		});
	});
});
