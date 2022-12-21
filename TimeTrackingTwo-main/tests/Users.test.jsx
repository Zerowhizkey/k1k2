import React from "react";
import Users from "../src/pages/Users";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectProvider } from "../src/context/ProjectContext";
describe("Users", () => {
	it("Render header", async () => {
		render(
			<ProjectProvider>
				<Users></Users>
			</ProjectProvider>
		);
		const header = screen.getByText("Users");
		screen.debug();
		expect(header).toBeInTheDocument();
	});
});
