import fs from 'fs';
import csv from 'csv-parser';

type Job = {
  title: string;
  location: string;
  description: string;
  job_type: string;
  level: string;
};

type Params = {
  location: string;
  job_type: string;
  level: string;
  skip: number;
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

export default async function getJobs(params?: Params): Promise<Job[]> {
  try {
    const jobs: Job[] = await readCsv();
    //filter by skip and limit

    if (params) {
      const { location, job_type, level } = params;
      return jobs.filter((job) => {
        return (
          (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true) &&
          (job_type ? job.job_type.toLowerCase().includes(job_type.toLowerCase()) : true) &&
          (level ? job.level.toLowerCase().includes(level.toLowerCase()) : true)
        );
      }).slice(params.skip, params.skip + params.limit);
    }

    return jobs;
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error.message}`);
  }
}