import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline';
import { joinClassNames } from '@/lib/helper';

const stats = [
  { id: 1, name: 'Total Recipients', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Avg. Open Rate', stat: '58.16%', icon: MailOpenIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Avg. Claim Rate', stat: '24.57%', icon: CursorClickIcon, change: '3.2%', changeType: 'decrease' },
];

export default function StatsDefault() {
  return (
    <div>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>Last 30 days</h3>

      <dl className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3'>
        {stats.map((item) => (
          <div
            key={item.id}
            className='relative px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:pt-6 sm:px-6'
          >
            <dt>
              <div className='absolute p-3 bg-gray-700 rounded-md'>
                <item.icon className='w-6 h-6 text-white' aria-hidden='true' />
              </div>
              <p className='ml-16 text-sm font-medium text-gray-500 truncate'>{item.name}</p>
            </dt>
            <dd className='flex items-baseline pb-6 ml-16 sm:pb-7'>
              <h3 className='text-3xl font-medium text-gray-900'>{item.stat}</h3>
              <p
                className={joinClassNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon className='self-center flex-shrink-0 w-5 h-5 text-green-500' aria-hidden='true' />
                ) : (
                  <ArrowSmDownIcon className='self-center flex-shrink-0 w-5 h-5 text-red-500' aria-hidden='true' />
                )}

                <span className='sr-only'>{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}
              </p>
              <div className='absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6'>
                <div className='text-sm'>
                  <a href='#' className='font-medium text-primary-600 hover:text-primary-500'>
                    {' '}
                    View all<span className='sr-only'> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
