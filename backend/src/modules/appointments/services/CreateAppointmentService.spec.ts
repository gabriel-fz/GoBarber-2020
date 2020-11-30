import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('shuld be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12321312312',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12321312312');
  });

  it('shuld be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 11, 25, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12321312312',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12321312312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
