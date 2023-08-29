/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Column, ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Menu } from "primereact/menu";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductService } from "@/demo/service/ProductService";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { Demo } from "@/types/types";
import { ChartData, ChartOptions } from "chart.js";
import { Dropdown } from "primereact/dropdown";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { CustomerService } from "@/demo/service/CustomerService";
import { InputText } from "primereact/inputtext";
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

const lineData: ChartData = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "First Dataset",
			data: [65, 59, 80, 81, 56, 55, 40],
			fill: false,
			backgroundColor: "#2f4860",
			borderColor: "#2f4860",
			tension: 0.4,
		},
		{
			label: "Second Dataset",
			data: [28, 48, 40, 19, 86, 27, 90],
			fill: false,
			backgroundColor: "#00bb7e",
			borderColor: "#00bb7e",
			tension: 0.4,
		},
	],
};

const Dashboard = () => {
	const [products, setProducts] = useState<Demo.Product[]>([]);
	const menu1 = useRef<Menu>(null);
	const menu2 = useRef<Menu>(null);
	const [lineOptions, setLineOptions] = useState<ChartOptions>({});
	const { layoutConfig } = useContext(LayoutContext);

	const applyDarkTheme = () => {
		const lineOptions = {
			plugins: {
				legend: {
					labels: {
						color: "#ebedef",
					},
				},
			},
			scales: {
				x: {
					ticks: {
						color: "#ebedef",
					},
					grid: {
						color: "rgba(160, 167, 181, .3)",
					},
				},
				y: {
					ticks: {
						color: "#ebedef",
					},
					grid: {
						color: "rgba(160, 167, 181, .3)",
					},
				},
			},
		};

		setLineOptions(lineOptions);
	};

	useEffect(() => {
		ProductService.getProductsSmall().then((data) => setProducts(data));
	}, []);

	useEffect(() => {
		applyDarkTheme();
	}, [layoutConfig.colorScheme]);

    const [customers1, setCustomers1] = useState<Demo.Customer[]>([]);
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');

    const representatives = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];

    const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'];

    const clearFilter1 = () => {
        initFilters1();
    };

    const onGlobalFilterChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        (_filters1['global'] as any).value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    useEffect(() => {

        CustomerService.getCustomersLarge().then((data) => {
            setCustomers1(getCustomers(data));
            setLoading1(false);
        });
        ProductService.getProductsWithOrdersSmall().then((data) => setProducts(data));

        initFilters1();
    }, []);

    const getCustomers = (data: Demo.Customer[]) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            'country.name': {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            },
            balance: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            status: {
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    };

    const countryBodyTemplate = (rowData: Demo.Customer) => {
        return (
            <React.Fragment>
                <img alt="flag" src={`/demo/images/flag/flag_placeholder.png`} className={`flag flag-${rowData.country.code}`} width={30} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.country.name}</span>
            </React.Fragment>
        );
    };

    const filterClearTemplate = (options: ColumnFilterClearTemplateOptions) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };

    const filterApplyTemplate = (options: ColumnFilterApplyTemplateOptions) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
    };

    const representativeBodyTemplate = (rowData: Demo.Customer) => {
        const representative = rowData.representative;
        return (
            <React.Fragment>
                <img
                    alt={representative.name}
                    src={`/demo/images/avatar/${representative.image}`}
                    onError={(e) => ((e.target as HTMLImageElement).src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                    width={32}
                    style={{ verticalAlign: 'middle' }}
                />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{representative.name}</span>
            </React.Fragment>
        );
    };

    const representativeFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <>
                <div className="mb-3 text-bold">Agent Picker</div>
                <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
            </>
        );
    };

    const representativesItemTemplate = (option: any) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`/demo/images/avatar/${option.image}`} width={32} style={{ verticalAlign: 'middle' }} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{option.name}</span>
            </div>
        );
    };

    const dateBodyTemplate = (rowData: Demo.Customer) => {
        return formatDate(rowData.date);
    };

    const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const balanceBodyTemplate = (rowData: Demo.Customer) => {
        return formatCurrency(rowData.balance as number);
    };

    const balanceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };

    const statusBodyTemplate = (rowData: Demo.Customer) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    };

    const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option: any) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    };

    const activityBodyTemplate = (rowData: Demo.Customer) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '.5rem' }}></ProgressBar>;
    };

    const activityFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        );
    };

    const verifiedBodyTemplate = (rowData: Demo.Customer) => {
        return (
            <i
                className={classNames('pi', {
                    'text-green-500 pi-check-circle': rowData.verified,
                    'text-pink-500 pi-times-circle': !rowData.verified
                })}
            ></i>
        );
    };

    const verifiedFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />;
    };

    const header1 = renderHeader1();

	return (
		<div className="grid">
			<div className="col-12 lg:col-6 xl:col-3">
				<div className="card mb-0">
					<div className="flex justify-content-between mb-3">
						<div>
							<span className="block text-500 font-medium mb-3">Orders</span>
							<div className="text-900 font-medium text-xl">152</div>
						</div>
						<div
							className="flex align-items-center justify-content-center bg-blue-100 border-round"
							style={{ width: "2.5rem", height: "2.5rem" }}
						>
							<i className="pi pi-shopping-cart text-blue-500 text-xl" />
						</div>
					</div>
					<span className="text-green-500 font-medium">24 new </span>
					<span className="text-500">since last visit</span>
				</div>
			</div>
			<div className="col-12 lg:col-6 xl:col-3">
				<div className="card mb-0">
					<div className="flex justify-content-between mb-3">
						<div>
							<span className="block text-500 font-medium mb-3">Revenue</span>
							<div className="text-900 font-medium text-xl">$2.100</div>
						</div>
						<div
							className="flex align-items-center justify-content-center bg-orange-100 border-round"
							style={{ width: "2.5rem", height: "2.5rem" }}
						>
							<i className="pi pi-map-marker text-orange-500 text-xl" />
						</div>
					</div>
					<span className="text-green-500 font-medium">%52+ </span>
					<span className="text-500">since last week</span>
				</div>
			</div>
			<div className="col-12 lg:col-6 xl:col-3">
				<div className="card mb-0">
					<div className="flex justify-content-between mb-3">
						<div>
							<span className="block text-500 font-medium mb-3">Customers</span>
							<div className="text-900 font-medium text-xl">28441</div>
						</div>
						<div
							className="flex align-items-center justify-content-center bg-cyan-100 border-round"
							style={{ width: "2.5rem", height: "2.5rem" }}
						>
							<i className="pi pi-inbox text-cyan-500 text-xl" />
						</div>
					</div>
					<span className="text-green-500 font-medium">520 </span>
					<span className="text-500">newly registered</span>
				</div>
			</div>
			<div className="col-12 lg:col-6 xl:col-3">
				<div className="card mb-0">
					<div className="flex justify-content-between mb-3">
						<div>
							<span className="block text-500 font-medium mb-3">Comments</span>
							<div className="text-900 font-medium text-xl">152 Unread</div>
						</div>
						<div
							className="flex align-items-center justify-content-center bg-purple-100 border-round"
							style={{ width: "2.5rem", height: "2.5rem" }}
						>
							<i className="pi pi-comment text-purple-500 text-xl" />
						</div>
					</div>
					<span className="text-green-500 font-medium">85 </span>
					<span className="text-500">responded</span>
				</div>
			</div>

			<div className="col-12 xl:col-6">
				<div className="card">
					<h5>Recent Sales</h5>
					<DataTable
						value={products}
						rows={5}
						paginator
						responsiveLayout="scroll"
					>
						<Column
							header="Image"
							body={(data) => (
								<img
									className="shadow-2"
									src={`/demo/images/product/${data.image}`}
									alt={data.image}
									width="50"
								/>
							)}
						/>
						<Column
							field="name"
							header="Name"
							sortable
							style={{ width: "35%" }}
						/>
						<Column
							field="price"
							header="Price"
							sortable
							style={{ width: "35%" }}
							body={(data) => formatCurrency(data.price)}
						/>
						<Column
							header="View"
							style={{ width: "15%" }}
							body={() => (
								<>
									<Button icon="pi pi-search" text />
								</>
							)}
						/>
					</DataTable>
				</div>
				<div className="card">
					<div className="flex justify-content-between align-items-center mb-5">
						<h5>Best Selling Products</h5>
						<div>
							<Button
								type="button"
								icon="pi pi-ellipsis-v"
								rounded
								text
								className="p-button-plain"
								onClick={(event) => menu1.current?.toggle(event)}
							/>
							<Menu
								ref={menu1}
								popup
								model={[
									{ label: "Add New", icon: "pi pi-fw pi-plus" },
									{ label: "Remove", icon: "pi pi-fw pi-minus" },
								]}
							/>
						</div>
					</div>
					<ul className="list-none p-0 m-0">
						<li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
							<div>
								<span className="text-900 font-medium mr-2 mb-1 md:mb-0">
									Space T-Shirt
								</span>
								<div className="mt-1 text-600">Clothing</div>
							</div>
							<div className="mt-2 md:mt-0 flex align-items-center">
								<div
									className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
									style={{ height: "8px" }}
								>
									<div
										className="bg-orange-500 h-full"
										style={{ width: "50%" }}
									/>
								</div>
								<span className="text-orange-500 ml-3 font-medium">%50</span>
							</div>
						</li>
						<li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
							<div>
								<span className="text-900 font-medium mr-2 mb-1 md:mb-0">
									Portal Sticker
								</span>
								<div className="mt-1 text-600">Accessories</div>
							</div>
							<div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<div
									className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
									style={{ height: "8px" }}
								>
									<div
										className="bg-cyan-500 h-full"
										style={{ width: "16%" }}
									/>
								</div>
								<span className="text-cyan-500 ml-3 font-medium">%16</span>
							</div>
						</li>
						<li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
							<div>
								<span className="text-900 font-medium mr-2 mb-1 md:mb-0">
									Supernova Sticker
								</span>
								<div className="mt-1 text-600">Accessories</div>
							</div>
							<div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<div
									className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
									style={{ height: "8px" }}
								>
									<div
										className="bg-pink-500 h-full"
										style={{ width: "67%" }}
									/>
								</div>
								<span className="text-pink-500 ml-3 font-medium">%67</span>
							</div>
						</li>
						<li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
							<div>
								<span className="text-900 font-medium mr-2 mb-1 md:mb-0">
									Wonders Notebook
								</span>
								<div className="mt-1 text-600">Office</div>
							</div>
							<div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<div
									className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
									style={{ height: "8px" }}
								>
									<div
										className="bg-green-500 h-full"
										style={{ width: "35%" }}
									/>
								</div>
								<span className="text-green-500 ml-3 font-medium">%35</span>
							</div>
						</li>
						<li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
							<div>
								<span className="text-900 font-medium mr-2 mb-1 md:mb-0">
									Mat Black Case
								</span>
								<div className="mt-1 text-600">Accessories</div>
							</div>
							<div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<div
									className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
									style={{ height: "8px" }}
								>
									<div
										className="bg-purple-500 h-full"
										style={{ width: "75%" }}
									/>
								</div>
								<span className="text-purple-500 ml-3 font-medium">%75</span>
							</div>
						</li>
						<li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
							<div>
								<span className="text-900 font-medium mr-2 mb-1 md:mb-0">
									Robots T-Shirt
								</span>
								<div className="mt-1 text-600">Clothing</div>
							</div>
							<div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<div
									className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
									style={{ height: "8px" }}
								>
									<div
										className="bg-teal-500 h-full"
										style={{ width: "40%" }}
									/>
								</div>
								<span className="text-teal-500 ml-3 font-medium">%40</span>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div className="col-12 xl:col-6">
				<div className="card">
					<h5>Sales Overview</h5>
					<Chart type="line" data={lineData} options={lineOptions} />
				</div>

				<div className="card">
					<div className="flex align-items-center justify-content-between mb-4">
						<h5>Notifications</h5>
						<div>
							<Button
								type="button"
								icon="pi pi-ellipsis-v"
								rounded
								text
								className="p-button-plain"
								onClick={(event) => menu2.current?.toggle(event)}
							/>
							<Menu
								ref={menu2}
								popup
								model={[
									{ label: "Add New", icon: "pi pi-fw pi-plus" },
									{ label: "Remove", icon: "pi pi-fw pi-minus" },
								]}
							/>
						</div>
					</div>

					<span className="block text-600 font-medium mb-3">TODAY</span>
					<ul className="p-0 mx-0 mt-0 mb-4 list-none">
						<li className="flex align-items-center py-2 border-bottom-1 surface-border">
							<div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
								<i className="pi pi-dollar text-xl text-blue-500" />
							</div>
							<span className="text-900 line-height-3">
								Richard Jones
								<span className="text-700">
									{" "}
									has purchased a blue t-shirt for{" "}
									<span className="text-blue-500">79$</span>
								</span>
							</span>
						</li>
						<li className="flex align-items-center py-2">
							<div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
								<i className="pi pi-download text-xl text-orange-500" />
							</div>
							<span className="text-700 line-height-3">
								Your request for withdrawal of{" "}
								<span className="text-blue-500 font-medium">2500$</span> has
								been initiated.
							</span>
						</li>
					</ul>

					<span className="block text-600 font-medium mb-3">YESTERDAY</span>
					<ul className="p-0 m-0 list-none">
						<li className="flex align-items-center py-2 border-bottom-1 surface-border">
							<div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
								<i className="pi pi-dollar text-xl text-blue-500" />
							</div>
							<span className="text-900 line-height-3">
								Keyser Wick
								<span className="text-700">
									{" "}
									has purchased a black jacket for{" "}
									<span className="text-blue-500">59$</span>
								</span>
							</span>
						</li>
						<li className="flex align-items-center py-2 border-bottom-1 surface-border">
							<div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
								<i className="pi pi-question text-xl text-pink-500" />
							</div>
							<span className="text-900 line-height-3">
								Jane Davis
								<span className="text-700">
									{" "}
									has posted a new questions about your product.
								</span>
							</span>
						</li>
					</ul>
				</div>
			</div>
			<div className="col-12">
				<div className="card">
					<h5>Filter Menu</h5>
					<DataTable
						value={customers1}
						paginator
						className="p-datatable-gridlines"
						showGridlines
						rows={10}
						dataKey="id"
						filters={filters1}
						filterDisplay="menu"
						loading={loading1}
						responsiveLayout="scroll"
						emptyMessage="No customers found."
						header={header1}
					>
						<Column
							field="name"
							header="Name"
							filter
							filterPlaceholder="Search by name"
							style={{ minWidth: "12rem" }}
						/>
						<Column
							header="Country"
							filterField="country.name"
							style={{ minWidth: "12rem" }}
							body={countryBodyTemplate}
							filter
							filterPlaceholder="Search by country"
							filterClear={filterClearTemplate}
							filterApply={filterApplyTemplate}
						/>
						<Column
							header="Agent"
							filterField="representative"
							showFilterMatchModes={false}
							filterMenuStyle={{ width: "14rem" }}
							style={{ minWidth: "14rem" }}
							body={representativeBodyTemplate}
							filter
							filterElement={representativeFilterTemplate}
						/>
						<Column
							header="Date"
							filterField="date"
							dataType="date"
							style={{ minWidth: "10rem" }}
							body={dateBodyTemplate}
							filter
							filterElement={dateFilterTemplate}
						/>
						<Column
							header="Balance"
							filterField="balance"
							dataType="numeric"
							style={{ minWidth: "10rem" }}
							body={balanceBodyTemplate}
							filter
							filterElement={balanceFilterTemplate}
						/>
						<Column
							field="status"
							header="Status"
							filterMenuStyle={{ width: "14rem" }}
							style={{ minWidth: "12rem" }}
							body={statusBodyTemplate}
							filter
							filterElement={statusFilterTemplate}
						/>
						<Column
							field="activity"
							header="Activity"
							showFilterMatchModes={false}
							style={{ minWidth: "12rem" }}
							body={activityBodyTemplate}
							filter
							filterElement={activityFilterTemplate}
						/>
						<Column
							field="verified"
							header="Verified"
							dataType="boolean"
							bodyClassName="text-center"
							style={{ minWidth: "8rem" }}
							body={verifiedBodyTemplate}
							filter
							filterElement={verifiedFilterTemplate}
						/>
					</DataTable>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
