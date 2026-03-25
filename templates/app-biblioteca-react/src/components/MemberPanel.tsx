import React, { useState } from 'react';
import { Member, MembershipType } from '../types';

export const MemberPanel: React.FC = () => {
  const [members] = useState<Member[]>([
    {
      id: 'member-1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '555-1234',
      membershipType: MembershipType.PREMIUM,
      registrationDate: new Date('2023-01-15'),
      activeLoans: 2,
      maxLoans: 10
    },
    {
      id: 'member-2',
      name: 'María García',
      email: 'maria@example.com',
      phone: '555-5678',
      membershipType: MembershipType.STANDARD,
      registrationDate: new Date('2023-06-20'),
      activeLoans: 1,
      maxLoans: 5
    }
  ]);

  const membershipLabels: Record<MembershipType, string> = {
    [MembershipType.STANDARD]: 'Estándar',
    [MembershipType.PREMIUM]: 'Premium',
    [MembershipType.STUDENT]: 'Estudiante'
  };

  return (
    <div className="member-panel">
      <h3>Socios</h3>
      {members.map(member => (
        <div key={member.id} className="member-item">
          <p><strong>{member.name}</strong></p>
          <p>Email: {member.email}</p>
          <p>Tipo: {membershipLabels[member.membershipType]}</p>
          <p>Préstamos activos: {member.activeLoans}/{member.maxLoans}</p>
        </div>
      ))}
    </div>
  );
};
