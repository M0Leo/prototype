import fs from 'fs';
import csv from 'csv-parser';

type Job = {
  title: string;
  location: string;
  description: string;
  job_type: string;
  level: string;
};

export type Params = {
  location: string;
  job_type: string;
  level: string;
  page: number;
  limit: number;
};

async function readCsv(): Promise<Job[]> {
  return new Promise((resolve, reject) => {
    const results: Job[] = [];
    fs.createReadStream('jobs.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

export interface PaginatedJobs {
  jobs: Job[];
  page: number;
  totalPages: number;
}

export default async function getJobs(params?: Params): Promise<PaginatedJobs> {
  try {
    const jobs: Job[] = await readCsv();
    let filteredJobs = jobs;

    // Pagination parameters
    const page = params?.page || 1;
    const limit = params?.limit || 10;

    // Filter jobs based on query parameters
    if (params) {
      const { location, job_type, level } = params;
      filteredJobs = jobs.filter((job) => {
        return (
          (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
          (!job_type || job.job_type.toLowerCase().includes(job_type.toLowerCase())) &&
          (!level || job.level.toLowerCase().includes(level.toLowerCase()))
        );
      });
    }

    // Paginate the filtered jobs
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    const totalPages = Math.ceil(jobs.length / limit);
    return { jobs: filteredJobs, page, totalPages};
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error.message}`);
  }
}
