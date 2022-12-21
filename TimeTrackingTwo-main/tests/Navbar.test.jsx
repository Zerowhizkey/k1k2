import React from "react";
import Navbar from "../src/components/Navbar";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectProvider } from "../src/context/ProjectContext";
import { MemoryRouter, Router } from "react-router-dom";
describe("Calendar", () => {
	it("Render header", async () => {
		render(
			<ProjectProvider>
				<MemoryRouter>
					<Navbar />
				</MemoryRouter>
			</ProjectProvider>
		);
		const linkA = screen.getByText("Overview");
		const linkB = screen.getByText("Calendar");
		const linkC = screen.getByText("Timer");
		screen.debug();
		expect(linkA).toBeInTheDocument();
		expect(linkB).toBeInTheDocument();
		expect(linkC).toBeInTheDocument();
	});
});
