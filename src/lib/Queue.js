import Bee from 'bee-queue';
import CancelationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancelationMail];
class Queue {
    constructor() {
        this.queues = {};
        this.init();
    }

    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                queue: new Bee(key, { redis: redisConfig }),
                handle,
            };
        });
    }

    add(queue, job) {
        return this.queues[queue].queue.createJob(job).save();
    }

    processQueue() {
        jobs.forEach(job => {
            const { queue, handle } = this.queues[job.key];

            queue.on('failed', this.handleFaliure).process(handle);
        });
    }

    handleFaliure(job, err) {
        console.log(`Queue ${job.queue.name}: FAILED`, err);
    }
}

export default new Queue();
