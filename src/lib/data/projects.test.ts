import { describe, it, expect } from 'vitest';
import { projects, type Project } from './projects';

describe('projects data', () => {
	it('should export projects array with Zod validation', () => {
		expect(projects).toBeDefined();
		expect(Array.isArray(projects)).toBe(true);
		expect(projects.length).toBeGreaterThan(0);
	});

	it('should have valid project structure', () => {
		projects.forEach((project: Project) => {
			expect(project).toHaveProperty('id');
			expect(project).toHaveProperty('title');
			expect(project).toHaveProperty('subtitle');
			expect(project).toHaveProperty('description');
			expect(project).toHaveProperty('imageUrl');
			expect(project).toHaveProperty('tags');
			expect(project).toHaveProperty('featured');
			expect(project.id).toBeTypeOf('string');
			expect(project.title).toBeTypeOf('string');
			expect(Array.isArray(project.tags)).toBe(true);
			expect(typeof project.featured).toBe('boolean');
		});
	});

	it('should have unique ids', () => {
		const ids = projects.map((p: Project) => p.id);
		const uniqueIds = new Set(ids);
		expect(uniqueIds.size).toBe(ids.length);
	});

	it('should have projects with tags', () => {
		projects.forEach((project: Project) => {
			expect(project.tags.length).toBeGreaterThan(0);
		});
	});

	it('should have featured projects', () => {
		const featuredProjects = projects.filter((p: Project) => p.featured);
		expect(featuredProjects.length).toBeGreaterThan(0);
	});
});
