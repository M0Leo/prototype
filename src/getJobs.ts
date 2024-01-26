type Job = {
  title: string;
  location: string;
  description: string;
};

export default async function getJobs(file?: string): Promise<Job[]> {
  try {
    const data = await fetch("http://localhost:8000/jobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        file: file ? file : "",
      },
    });
    if (!data.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const jobs: Job[] = await data.json();
    return jobs;
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error.message}`);
  }
}